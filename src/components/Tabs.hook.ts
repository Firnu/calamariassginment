import { useState } from "react";
import { Tab } from "./Tabs";

export function useTabs(startTab: Tab, onTabChanged: (tab: Tab) => void) {
    const [stateTab, setStateTab] = useState<Tab | null>();
    const selectedTab = stateTab ?? startTab;

    function setSelectedTab(tab: Tab) {
        if (selectedTab.id === tab.id) {
            return;
        }

        setStateTab(tab);
        onTabChanged(tab);
    }

    return [selectedTab, setSelectedTab] as const;
}