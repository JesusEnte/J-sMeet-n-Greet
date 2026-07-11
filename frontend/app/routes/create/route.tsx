import type { Route } from "./+types/route";
import { Form } from "react-router";
import './create.css'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create | J'sMeet'n'Greet" },
    { name: "description", content: "Create" },
  ];
}

export default function Create(){
    return <Form>
      
    </Form>
}