import { useThemeMode } from "./SetThemeMode";

export const GetMode = ()=>{
    const {thememode} = useThemeMode();
    return thememode;
}
