import * as React from "react";
import { Card } from "@zeit-ui/react";
import copy from "clipboard-copy";

export interface Template {
  label: string;
  value: string;
}

interface Props {
  templates: Template[];
}

export const TemplateList = (props: Props) => {
  return (
    <div className="templateList">
      {props.templates.length === 0 ? (
        <TemplateNotFound />
      ) : (
        props.templates.map((template) => {
          return <TemplateListEl {...template} />;
        })
      )}
    </div>
  );
};

const TemplateListEl = (props: Template) => {
  return (
    <li>
      <Card className="template--listel" hoverable onClick={() => copy(props.value)}>
        {props.label}
      </Card>
    </li>
  );
};

const TemplateNotFound = () => {
  return <div className="template--notfound">not found</div>;
};
