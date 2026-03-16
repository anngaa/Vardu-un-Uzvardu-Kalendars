import React from "react";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";

export type SolarIconName =
    | "magnifer-linear"
    | "home-angle-2-linear"
    | "calendar-linear"
    | "users-group-two-rounded-linear"
    | "settings-minimalistic-linear"
    | "close-circle-linear"
    | "alt-arrow-left-linear"
    | "alt-arrow-right-linear";

interface SolarIconProps {
    name: SolarIconName;
    size?: number;
    color?: string;
}

export default function SolarIcon({ name, size = 24, color = "#000" }: SolarIconProps) {
    switch (name) {
        case "magnifer-linear":
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Circle cx={11.5} cy={11.5} r={9.5} stroke={color} strokeWidth={1.5} />
                    <Path d="M18.5 18.5L22 22" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
                </Svg>
            );

        case "home-angle-2-linear":
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M2.364 12.958c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093z"
                        stroke={color}
                        strokeWidth={1.5}
                    />
                    <Path d="M12 15v3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
                </Svg>
            );

        case "calendar-linear":
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"
                        stroke={color}
                        strokeWidth={1.5}
                    />
                    <Path
                        d="M7 4V2.5M17 4V2.5M2.5 9h19"
                        stroke={color}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                    />
                    <Circle cx={17} cy={17} r={1} fill={color} />
                    <Circle cx={17} cy={13} r={1} fill={color} />
                    <Circle cx={12} cy={17} r={1} fill={color} />
                    <Circle cx={12} cy={13} r={1} fill={color} />
                    <Circle cx={7} cy={17} r={1} fill={color} />
                    <Circle cx={7} cy={13} r={1} fill={color} />
                </Svg>
            );

        case "users-group-two-rounded-linear":
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Circle cx={12} cy={6} r={4} stroke={color} strokeWidth={1.5} />
                    <Path
                        d="M18 9c1.657 0 3-1.12 3-2.5S19.657 4 18 4M6 9C4.343 9 3 7.88 3 6.5S4.343 4 6 4"
                        stroke={color}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                    />
                    <Ellipse cx={12} cy={17} rx={6} ry={4} stroke={color} strokeWidth={1.5} />
                    <Path
                        d="M20 19c1.754-.385 3-1.359 3-2.5s-1.246-2.115-3-2.5M4 19c-1.754-.385-3-1.359-3-2.5s1.246-2.115 3-2.5"
                        stroke={color}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                    />
                </Svg>
            );

        case "settings-minimalistic-linear":
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M7.843 3.802C9.872 2.601 10.886 2 12 2s2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594s-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22s-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7s1.571-1.59 3.6-2.792z"
                        stroke={color}
                        strokeWidth={1.5}
                    />
                    <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.5} />
                </Svg>
            );

        case "close-circle-linear":
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.5} />
                    <Path d="m14.5 9.5l-5 5m0-5l5 5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
                </Svg>
            );

        case "alt-arrow-left-linear":
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="m15 5l-6 7l6 7"
                        stroke={color}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            );

        case "alt-arrow-right-linear":
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <Path
                        d="m9 5l6 7l-6 7"
                        stroke={color}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            );

        default:
            return null;
    }
}
