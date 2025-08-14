import { VNode } from "preact";

export const NotFound = (props: { element: VNode<any> }) => {
  set_not_found_element(props.element);
  return <></>;
};

let not_found_element: VNode<any> = <div>404 Not Found</div>;

export const set_not_found_element = (el: VNode<any>) => {
  not_found_element = el;
};

export const get_not_found_element = () => not_found_element;
