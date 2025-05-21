import { ZodRawShape } from "zod";
import { type McpServer, type ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js"
import { type ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";


/**
 * tool<Args extends ZodRawShape>(name: string, paramsSchemaOrAnnotations: Args | ToolAnnotations, cb: ToolCallback<Args>): RegisteredTool;
 * withServer devuelve una función que recibe el server y registra la tool.
 */
export function withServer<Args extends ZodRawShape>(
  name: string,
  paramsSchemaOrAnnotations: Args | ToolAnnotations,
  handler: ToolCallback<Args>
) {

  // Devuelve una función que espera el server
  return (server: McpServer) => {
    server.tool(name, paramsSchemaOrAnnotations, handler);
  };
}
