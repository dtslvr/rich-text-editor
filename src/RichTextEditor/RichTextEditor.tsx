import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import { PlateStoreState } from "@udecode/plate";
import clsx from "clsx";
import React, { FunctionComponent, useState } from "react";

import RichTextArea from "./RichTextArea";
import RichTextEditorToolbar from "./RichTextEditorToolbar";

export interface RichTextEditorProps {
    /**
     * List of marks to customize the toolbar.
     */
    customizedToolbar?: string[];
    /**
     * The id of the editor instance.
     */
    editorId?: string;
    /**
     * The initial value of the rich text editor.
     */
    defaultValue: PlateStoreState["value"];
    /**
     * Enable the inline editor mode.
     */
    enableInlineEditor?: boolean;
    /**
     * Label of the rich text editor.
     */
    label?: string;
    /**
     * This event is fired on every value change.
     */
    onChange?: (document: PlateStoreState["value"]) => void;
}

const styles = (theme: Theme) =>
    createStyles({
        fieldset: {
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: theme.spacing(0.5),
            fontFamily: theme.typography.fontFamily,
            margin: 0,
            "&:hover": {
                borderColor: theme.palette.text.primary,
            },
            "&.focus": {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
                marginLeft: -1,
                marginTop: 1,
            },
            "& > div": {
                padding: "1px 0",
            },
            "&.focus > div": {
                padding: 0,
            },
        },
        legend: {
            background: "var(--bv-container-content-background-color, #ffffff)",
            color: "rgba(0, 0, 0, 0.54)",
            fontSize: theme.spacing(1.5),
            fontWeight: 400,
            lineHeight: theme.spacing(1.5) + "px",
            padding: "0 5px",
            "&.focus": {
                color: theme.palette.primary.main,
            },
        },
    });

const RichTextEditor: FunctionComponent<
    WithStyles<typeof styles> & Readonly<RichTextEditorProps>
> = ({
    classes,
    customizedToolbar = [
        "bold",
        "italic",
        "underline",
        "highlight",
        "highlight2",
    ],
    editorId,
    defaultValue,
    enableInlineEditor = false,
    label,
    onChange,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <fieldset className={clsx(classes.fieldset, isFocused && "focus")}>
            {label && (
                <legend className={clsx(classes.legend, isFocused && "focus")}>
                    {label}
                </legend>
            )}
            <div>
                <RichTextArea
                    customizedToolbar={customizedToolbar}
                    defaultValue={defaultValue}
                    editableProps={{
                        onFocus: () => setIsFocused(true),
                        onBlur: () => setIsFocused(false),
                    }}
                    editorId={editorId}
                    enableInlineEditor={enableInlineEditor}
                    onChange={onChange}
                >
                    {enableInlineEditor === false && (
                        <RichTextEditorToolbar
                            customizedToolbar={customizedToolbar}
                        />
                    )}
                </RichTextArea>
            </div>
        </fieldset>
    );
};

export default withStyles(styles)(RichTextEditor);
