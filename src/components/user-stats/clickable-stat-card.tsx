"use client"

import "./user-stats.css";
import {Tabs} from "@/components/user-stats/user-stats";

export interface ClickableStatCardProps {
    cardUseState: { selectedCard: Tabs, setSelectedCard: (selectedCard: Tabs) => void; }
    cardType: Tabs;
    hint: string;
    value: number | string;
    isLoading?: boolean;
}

const getClassName = (card: Tabs, selectedCard: Tabs, isLoading?: boolean): string => {
    const base = "statbox statbox-clickable";
    const active = card === selectedCard ? "statbox--active" : "";
    const loading = isLoading ? "disabled" : "clickable";
    return `${base} ${active} ${loading}`;
};

export default function ClickableStatCard({cardUseState, cardType, hint, value, isLoading}: ClickableStatCardProps) {
    return (
        <div className={getClassName(cardUseState.selectedCard, cardType, isLoading)} onClick={() => {
            if (!isLoading) {
                cardUseState.setSelectedCard(cardType)
            }
        }}>
            <span className="stat-summary--subtle-text">{hint}</span>
            {isLoading ? <span className="loading-spinner"></span> :
                <span className="stat-summary--main-text">{value}</span>}
        </div>
    )
}
