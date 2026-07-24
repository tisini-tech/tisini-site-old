import { LucideIcon } from "lucide-react";

type UrlNameLabelType = string | (() => string);

// Base type
type BaseType = {
    type: 'button' | 'link';
    name: UrlNameLabelType;
    Icon: LucideIcon;
    href?: string; // Optional for Button
    cb?: () => void; // Optional for Link
};

// Button type extending the base type
type Button = BaseType & {
    type: 'button';
    cb: () => void; // Mandatory for Button
};

// LinkItemType extending the base type
type LinkItemType = BaseType & {
    type: 'link';
    href: string; // Mandatory for Link
};


type ListItem = Button | LinkItemType

export const createNavLinks = (list: ListItem[]) => {
    const rand = () => (Math.random() * 100000)
    const withId = (item: ListItem) => ({ ...item, id: rand().toString(32) })
    const derived = list.map(item => {
        switch (item.type) {
            case 'button':
                if (typeof item.cb === 'function') {
                    return withId(item)
                } else {
                    throw new Error("Button items must have a 'cb' function.");
                }

            case 'link':
                if (typeof item.href === 'string') {
                    return withId(item)
                } else {
                    throw new Error("Link items must have an 'href' string.");
                }

            default:
                throw withId(item)
        }
    });
    return derived
}