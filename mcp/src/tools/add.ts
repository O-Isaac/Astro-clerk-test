import { z } from "zod";
import { withServer } from "../lib/defineTool";

const params = {
    a: z.number(),
    b: z.number(),
}

export default withServer("add", params, async ({ a, b }) => {
    return {
        content: [{ type: "text", text: String(a + b) }],
    }
})