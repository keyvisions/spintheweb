/**
 * Spin the Web Graph content
 * 
 * Language: TypeScript for Deno
 * 
 * MIT License. Copyright (c) 2024 Giancarlo Trevisan
**/
import { STWFactory, STWSession } from "../stwComponents/stwSession.ts";
import { STWContent, ISTWContent } from "../stwElements/stwContent.ts";
import { ISTWRecords } from "../stwComponents/stwDatasources.ts";

export class STWGraph extends STWContent {
	public constructor(content: ISTWContent) {
		super(content);
	}

	public override render(_req: Request, _session: STWSession, _records: ISTWRecords): string {
		return `TODO: Render ${this.constructor.name} <pre>${_records}</pre>`;
	}
}

STWFactory.Tree = STWGraph;