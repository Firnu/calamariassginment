import React from "react";
import { useTabs } from "./Tabs.hook";
import "./tabs.scss";

export type Tab = {
    id: string,
    label: string,
}

export interface TabsProps extends React.HTMLAttributes<React.ReactNode> {
    tabs: Tab[],
    startTab: Tab,
    onTabChanged: (selectedTab: Tab) => void,
}

export function Tabs({
    tabs,
    startTab,
    onTabChanged }: TabsProps) {

    const [selectedTab, setSelectedTab] = useTabs(startTab, onTabChanged);

    return <div className="tabs">
        {
            tabs.map(tab => <button
                key={tab.id}
                onClick={() => setSelectedTab(tab)}
                aria-pressed={selectedTab.id === tab.id}
                data-testid={`tab-${tab.id}`}
                className={`tab-button${selectedTab.id === tab.id ? ` selected` : ""}`}>
                {tab.label}
            </button>)
        }
    </div>
}