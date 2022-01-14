import { PlateStoreState } from "@udecode/plate";
import React, { FunctionComponent, useEffect, useState } from "react";

import RichTextArea from "./RichTextArea";

const RichTextView: FunctionComponent<
    Readonly<{
        customizedToolbar: string[];
        value: PlateStoreState["value"];
    }>
> = ({ customizedToolbar, value }) => {
    // As the slate editor uses the value only as a starting point and does not update the view on later updates
    // of it, we need to recreate the rich text view to trigger a rerender.
    const [rerenderValue, setRerenderValue] = useState(false);
    useEffect(() => {
        setRerenderValue(true);
        setTimeout(() => setRerenderValue(false));
    }, [value]);

    return rerenderValue ? null : (
        <RichTextArea
            customizedToolbar={customizedToolbar}
            defaultValue={value}
            editableProps={{ readOnly: true }}
        />
    );
};
export default RichTextView;
