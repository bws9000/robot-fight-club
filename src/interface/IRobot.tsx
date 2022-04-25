export default interface IRobot{
    [index: string]: any;
    name?:string;
    type?:number;
    height?:number;
    color?:string;
    active?:boolean;
}