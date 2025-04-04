/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useMemo } from "react";
import JoditEditor from "jodit-react";

const copyStringToClipboard = function (str: any) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const facilityMergeFields = [
  "FacilityNumber",
  "FacilityName",
  "Address",
  "MapCategory",
  "Latitude",
  "Longitude",
  "ReceivingPlant",
  "TrunkLine",
  "SiteElevation",
];
const inspectionMergeFields = ["InspectionCompleteDate", "InspectionEventType"];
const createOptionGroupElement = (mergeFields: any, optionGrouplabel: any) => {
  const optionGroupElement = document.createElement("optgroup");
  optionGroupElement.setAttribute("label", optionGrouplabel);
  for (let index = 0; index < mergeFields.length; index++) {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("class", "merge-field-select-option");
    optionElement.setAttribute("value", mergeFields[index]);
    optionElement.text = mergeFields[index];
    optionGroupElement.appendChild(optionElement);
  }
  return optionGroupElement;
};

// Cấu hình các tùy chọn cho editor
const buttons = [
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "align",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "fullsize",
  "selectall",
  "print",
  "|",
  "source",
  {
    name: "insertMergeField",
    tooltip: "Insert Merge Field",
    iconURL: "images/merge.png",
    popup: (editor: any) => {
      function onSelected(e: any) {
        const mergeField = e.target.value;
        if (mergeField) {
          console.log(mergeField);
          editor.selection.insertNode(editor.create.inside.fromHTML("{{" + mergeField + "}}"));
        }
      }
      const divElement = editor.create.div("merge-field-popup");

      const labelElement = document.createElement("label");
      labelElement.setAttribute("class", "merge-field-label");
      divElement.appendChild(labelElement);

      const selectElement = document.createElement("select");
      selectElement.setAttribute("class", "merge-field-select");
      selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
      selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
      selectElement.onchange = onSelected;
      divElement.appendChild(selectElement);

      return divElement;
    },
  },
  {
    name: "copyContent",
    tooltip: "Copy HTML to Clipboard",
    iconURL: "images/copy.png",
    exec: function (editor: any) {
      const html = editor.value;
      copyStringToClipboard(html);
    },
  },
];

const TextEditor = ({
  value = "",
  onChange,
  disabled = false,
  height = 500,
  showToolbar = true,
  placeholder = "",
}: {
  value: string;
  disabled?: boolean;
  onChange: (htmlString: string) => void;
  height?: number;
  showToolbar?: boolean;
  placeholder?: string;
}): JSX.Element => {
  // Cấu hình cho JoditEditor
  const config = useMemo(() => {
    return {
      readonly: disabled,
      toolbar: showToolbar,
      spellcheck: true,
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      buttons: buttons,
      placeholder,
      toolbarHover: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      height,
    };
  }, [disabled, height, showToolbar]);
  const [data, setData] = React.useState(value);
  const handeChangeData = (htmlString: string) => {
    setData(htmlString);
  };
  React.useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <div>
      <JoditEditor
        value={data}
        config={config}
        onBlur={(htmlString: string) => onChange(htmlString)} // Gọi mỗi khi editor mất focus
        onChange={(htmlString: string) => handeChangeData(htmlString)} // Gọi mỗi khi nội dung thay đổi
      />
    </div>
  );
};

export default memo(TextEditor);
