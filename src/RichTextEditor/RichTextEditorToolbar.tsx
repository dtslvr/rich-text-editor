import {
    Box,
    Divider,
    IconButton,
    makeStyles,
    Toolbar,
} from "@material-ui/core";
import { BorderColor } from "@material-ui/icons";
import {
    getPreventDefaultHandler,
    isMarkActive,
    MARK_BOLD,
    MARK_HIGHLIGHT,
    MARK_ITALIC,
    MARK_UNDERLINE,
    toggleMark,
} from "@udecode/plate";
import clsx from "clsx";
import { FormatBold, FormatItalic, FormatUnderline } from "mdi-material-ui";
import React, { FunctionComponent, ReactElement } from "react";
import { useSlate } from "slate-react";

import {
    defaultHighlightColorContrast,
    defaultHighlightColorContrast2,
} from "./configuration";
import { MARK_HIGHLIGHT_2 } from "./plugins";

const useStyles = makeStyles((theme) => ({
    divider: {
        alignSelf: "center",
        height: "1rem",
        margin: theme.spacing(0, 1),
    },
    iconButton: {
        padding: theme.spacing(1),
    },
    markHighlightIconDefault: {
        "& > path:last-child": {
            fill: "transparent",
            fillOpacity: 1,
        },
    },
    markHighlightIcon: {
        "& > path:last-child": {
            fill: defaultHighlightColorContrast,
        },
    },
    markHighlightIcon2: {
        "& > path:last-child": {
            fill: defaultHighlightColorContrast2,
        },
    },
    toolbar: {
        minHeight: 0,
        padding: 0,
    },
}));

export const RichTextEditorToolbar: FunctionComponent<
    Readonly<{
        customizedToolbar: string[];
    }>
> = ({ customizedToolbar }) => {
    const classes = useStyles();

    return (
        <>
            <Toolbar className={classes.toolbar}>
                {customizedToolbar.includes("bold") && (
                    <MarkIconButton
                        icon={<FormatBold fontSize="small" />}
                        mark={MARK_BOLD}
                    />
                )}
                {customizedToolbar.includes("italic") && (
                    <MarkIconButton
                        icon={<FormatItalic fontSize="small" />}
                        mark={MARK_ITALIC}
                    />
                )}
                {customizedToolbar.includes("underline") && (
                    <MarkIconButton
                        icon={<FormatUnderline fontSize="small" />}
                        mark={MARK_UNDERLINE}
                    />
                )}
                {(customizedToolbar.includes("bold") ||
                    customizedToolbar.includes("italic") ||
                    customizedToolbar.includes("underline")) && (
                    <Divider
                        orientation="vertical"
                        flexItem
                        className={classes.divider}
                    />
                )}
                <Box alignItems="center" display="flex">
                    {customizedToolbar.includes("highlight") && (
                        <MarkIconButton
                            clear={MARK_HIGHLIGHT_2}
                            icon={
                                <BorderColor
                                    className={clsx(
                                        classes.markHighlightIconDefault,
                                        classes.markHighlightIcon
                                    )}
                                    fontSize="small"
                                />
                            }
                            mark={MARK_HIGHLIGHT}
                        />
                    )}
                    {customizedToolbar.includes("highlight2") && (
                        <MarkIconButton
                            clear={[MARK_HIGHLIGHT]}
                            icon={
                                <BorderColor
                                    className={clsx(
                                        classes.markHighlightIconDefault,
                                        classes.markHighlightIcon2
                                    )}
                                    fontSize="small"
                                />
                            }
                            mark={MARK_HIGHLIGHT_2}
                        />
                    )}
                </Box>
            </Toolbar>
        </>
    );
};

const MarkIconButton: FunctionComponent<
    Readonly<{
        clear?: string | string[];
        icon: ReactElement;
        mark: string;
    }>
> = ({ clear, icon, mark }) => {
    const editor = useSlate();
    const classes = useStyles();

    return (
        <IconButton
            className={classes.iconButton}
            color={isMarkActive(editor, mark) ? "primary" : "default"}
            onMouseDown={getPreventDefaultHandler(toggleMark, editor, {
                clear,
                key: mark,
            })}
        >
            {icon}
        </IconButton>
    );
};

export default RichTextEditorToolbar;
