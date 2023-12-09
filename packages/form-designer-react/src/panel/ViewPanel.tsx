import React, {FC, useEffect, useLayoutEffect, useMemo, useRef} from "react"
import {AuxToolsWidget} from "../widget";
import {useOperation} from "../hooks/useOperation";
import styled from "@emotion/styled";
import {ViewportContext} from "../context";
import {Viewport} from "../model";

const ViewPanelStyled = styled('div')({
    height: '100%',
    position: 'relative'
})

type ViewPanelProps = {
    children?: React.ReactNode
}
export const ViewPanel: FC<ViewPanelProps> = ({children}) => {
    const ref = useRef<HTMLDivElement>()
    const {eventManager} = useOperation()

    const viewport = useMemo(() => {
        console.log('ref.current', ref.current)

        return new Viewport({viewportElement: ref.current})
    }, [ref,ref.current]);


    useLayoutEffect(()=>{
        if (ref.current){
            viewport.onMoment(ref.current)
        }
    },[])


    return <ViewportContext.Provider value={viewport}>
        <ViewPanelStyled ref={ref} className={`td-view-panel`} onClick={(e) => eventManager.onMouseClick(e)}>
            {children}
            <AuxToolsWidget/>
        </ViewPanelStyled>
    </ViewportContext.Provider>
}