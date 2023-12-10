import styled from "@emotion/styled";
import React, {useEffect, useRef} from "react";
import {FC} from "react";
import {useFormDesigner} from "../../hooks/useFormDesigner";
import {useOperation} from "../../hooks/useOperation";
import {observer} from "@formily/react";
import {useViewport} from "../../hooks/useViewport";

const DashedBoxStyled = styled('div')({
    position: 'absolute',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    '.td-aux-dashed-box-title': {
        position: 'absolute',
        left: 0,
        fontSize: '12px',
        userSelect: 'none'
    }
})

type DashedBoxProps = {}
export const DashedBox: FC<DashedBoxProps> = observer(({}) => {
    const ref = useRef<HTMLDivElement>()
    const spanRef = useRef<HTMLDivElement>()
    const {nodeIdAttrName} = useFormDesigner()
    const {dragging, hoverNode, selectionNode} = useOperation()
    const viewport = useViewport()

    useEffect(() => {
        console.log("ss")
        // @ts-ignore
        console.log(hoverNode)
        if (!ref.current && hoverNode) {
            return
        }
        const hoverNodeEl = document.querySelector(`*[${nodeIdAttrName}=${hoverNode?.id}]`)
        console.log(hoverNode)

        if (hoverNodeEl) {
            console.log("node: {} {}", hoverNodeEl.clientWidth, hoverNodeEl.clientHeight)
            const rect = viewport.viewportNodeRect(hoverNodeEl)
            console.log(rect)
            ref.current.style.height = `${rect.height}px`
            ref.current.style.width = `${rect.width}px`
            ref.current.style.border = `1px dashed #1890FF`
            ref.current.style.transform = `perspective(1px) translate3d(0px, ${rect.top}px, 0px)`

            if (spanRef.current) {
                if (hoverNode == hoverNode.root) {

                } else {
                    if (rect.top > 10) {
                        spanRef.current.style.top = 'auto';
                        spanRef.current.style.bottom = '100%';
                    } else {
                        spanRef.current.style.top = '100%';
                        spanRef.current.style.bottom = 'auto';
                    }
                }
            }
        }
    }, [dragging, hoverNode, selectionNode]);

    return <>
        {!dragging && hoverNode && (hoverNode != selectionNode) && <DashedBoxStyled ref={ref}>
            {hoverNode != hoverNode.root && <span ref={spanRef} className={`td-aux-dashed-box-title`}>{hoverNode?.title}</span>}
        </DashedBoxStyled>}
    </>
})