import { handleContact, type ContactEnv } from "../../src/lib/contact/handle-contact.ts";

export function onRequest(context: { request: Request; env: ContactEnv }) {
  return handleContact(context.request, context.env);
}
