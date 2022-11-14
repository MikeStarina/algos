import { ElementStates } from "../../types/element-states";



export const stackCircleStyle = (index: number, currentIndex: number) => {
    if (index === currentIndex) return ElementStates.Changing
    return ElementStates.Default
}