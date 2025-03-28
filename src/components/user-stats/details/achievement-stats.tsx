"use client"

import "./detailed-stats.css";
import {Achievement, Game} from "@/types";

interface AchievementStatsProps {
    data: {
        achievements: Achievement[];
        game: Game;
    }[]
}

export default function AchievementStats({data}: AchievementStatsProps) {
    return (
        <div className="section section--stats round-border ">
            <div className="achievement-stats">
                {data.map(({achievements, game}, index) => (
                    <AchievementList achievements={achievements} game={game} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
}

interface AchievementListProps {
    achievements: Achievement[];
    game: Game;
    index: number;
}

function AchievementList({achievements, game, index}: AchievementListProps) {
    if (achievements.length == 0) return <></>;

    return (
        <div key={index} className="all-achievements-container">
            <div className="interesting">{game.name}</div>
            <div className="single-achievements-container">
                {achievements.map((achievement, index) => (
                    <div key={index} className={`achievement ${achievement.achieved ? "" : "achievement-locked"}`}>
                        <div
                            className={`achievement--tick achievement--tick-${achievement.achieved ? "achieved" : "locked"}`}>
                            {achievement.achieved ? "😊" : "😔"}
                        </div>
                        <div className="achievement--description">
                            <span className="bold">{achievement.name}</span>: {achievement.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}