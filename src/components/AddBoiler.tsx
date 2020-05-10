import * as React from "react";

import { PlusCircle, XCircle } from "@zeit-ui/react-icons";
import { Input, Textarea, useInput, Button, useToasts } from "@zeit-ui/react";
import { Template } from "./TemplateList";

// * override zeit-ui's useInput's wrong type declare. if https://github.com/zeit-ui/react/pull/194 is merged, delete it.
type useInputFixed = (
  initialValue: string
) => {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  currentRef: React.MutableRefObject<string>;
  reset: () => void;
  bindings: {
    value: string;
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  };
};

interface Props {
  setTemplates: (tar: Template[]) => void;
  templates: Template[];
}

export const AddBoiler = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const { reset, bindings } = (useInput as useInputFixed)("");
  const [label, setLabel] = React.useState("");
  const [, setToast] = useToasts();
  const reaction = (type: "success") =>
    setToast({
      text: `${label} is successfully stored!!`,
      type,
    });

  const submit = () => {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "addTemplate",
        label: label,
        value: bindings.value,
      },
      () => {
        reaction("success");
        const nextTemplates = Array.from(props.templates);
        nextTemplates.push({
          label: label,
          value: bindings.value,
        });
        props.setTemplates(nextTemplates);
        reset();
        setLabel("");
      }
    );
  };

  return (
    <div className="addboiler">
      <div
        className="addboiler--header"
        onClick={() => {
          setOpen(!open);
        }}>
        {!open ? (
          <React.Fragment>
            Add Template <PlusCircle />
          </React.Fragment>
        ) : (
          <React.Fragment>
            Close Form <XCircle />
          </React.Fragment>
        )}
      </div>

      <form className={`addboiler--form`} id={open ? "active" : "disable"}>
        <Input
          label="Label"
          placeholder="ex) name"
          width="90%"
          value={label}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLabel(e.target.value);
          }}
          className="addboiler--label"
        />
        {/*
        // TODO: form suggestion according to input.label and key   
         <Input
          label="Key"
          placeholder="ex) programming,background,experience"
          width="90%"
        /> */}
        <Textarea
          className="addboiler--value"
          width="90%"
          {...bindings}
          placeholder={`set template value.
        ex) 実務経験歴
        ~~社で長期インターンとしてなにやらしていてホニャホニャっぷを作っていました.僕はフロントエンドの神`}
        />
        <Button
          iconRight={<PlusCircle />}
          auto
          size="small"
          onClick={() => {
            submit();
          }}>
          Add
        </Button>
      </form>
    </div>
  );
};
