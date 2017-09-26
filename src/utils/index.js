import b from "bem-cn";

b.setup({ el: "--" });

export const block = b;

export function handleChange(e) {
  const value = e.target.value;
  if (!e.target.id) {
    throw new Error("no target id");
  }
  this.setState({ [e.target.id]: value });
}

export function handleBlur(e) {
  const value = e.target.value.trim();
  if (!e.target.id) {
    throw new Error("no target id");
  }
  this.setState({ [e.target.id]: value });
}
