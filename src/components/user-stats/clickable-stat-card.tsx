"use client"

import "./user-stats.css";
import {Tabs} from "@/components/user-stats/user-stats";

export interface ClickableStatCardProps {
    cardUseState: { selectedCard: Tabs, setSelectedCard: (selectedCard: Tabs) => void; }
    cardType: Tabs;
    hint: string;
    value: number | string;
}


export default function ClickableStatCard({cardUseState, cardType, hint, value}: ClickableStatCardProps) {

    const classname = cardUseState.selectedCard === cardType
        ? "statbox statbox-clickable statbox--active"
        : "statbox statbox-clickable";

    return (
        <div className={classname} onClick={() => cardUseState.setSelectedCard(cardType)}>
            <span className="stat-summary--subtle-text">{hint}</span>
            <span className="stat-summary--main-text">{value}</span>
        </div>
    )
}
