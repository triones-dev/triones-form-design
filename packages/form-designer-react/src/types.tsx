import React from "react";
import {TreeNode} from "./TreeNode";
import {ISchema} from "@formily/react";

export type IResource = {
    name?: string
    icon?: string
    schema?: ISchema
    [key:string]:any
}

export type DesignerComponent = IResource & {node?:TreeNode}

export type IComponents = {
    [key:string]: TdFC<any>
}

export type TdFC<P = {}> = React.FC<P> & {
    Resource?: IResource[]
}