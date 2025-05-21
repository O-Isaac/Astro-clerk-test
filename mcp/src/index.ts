import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import add from "@/tools/add";
import getProductosTool from "@/tools/getAllProducts";
import crearPedido from "@/tools/crearPedido";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	public server = new McpServer({
		name: "Authless Store",
		version: "1.0.0",
	});

	async init() {
		// Register tools
		add(this.server);
		getProductosTool(this.server);
		crearPedido(this.server);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
		}

		if (url.pathname === "/mcp") {
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};
