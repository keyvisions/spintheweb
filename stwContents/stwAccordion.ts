/**
 * Spin the Web Accordion content
 * 
 * Language: TypeScript for Deno
 * 
 * MIT License. Copyright (c) 2025 Giancarlo Trevisan
**/
import { STWFactory, STWSession } from "../stwComponents/stwSession.ts";
import { STWContent, ISTWOption, ISTWContentWithOptions } from "../stwElements/stwContent.ts";

export class STWAccordion extends STWContent {
	options: ISTWOption[] = [];

	public constructor(content: ISTWContentWithOptions) {
		super(content);

		if (content.options)
			content.options.forEach((option: ISTWOption) => {
				this.options.push({ name: new Map(Object.entries(option.name || {})), ref: option.ref || "" });
			});
	}

	public override render(_req: Request, session: STWSession): string {
		let body = "";

		this.options.forEach(option => {
			const element = session.site.find(session, option.ref || "");
			if (element instanceof STWContent && element.isVisible(session)) {
				const name = option.name.get(session.lang) || (element ? element.localize(session, "name") : option.ref);
				body += `<dt data-ref="${element._id}"><i class="fa-light fa-fw fa-angle-down"></i>${name}</dt><dd><article id="${crypto.randomUUID()}" href="${option.ref}${(new URL(_req.url)).search}"></article></dd>`;
			}
		});

		if (body === "")
			return "";

		// The STWAccordion script selects the clicked accordion and requests from the spinner the accordion content
		return `<dl onclick="fnSTWAccordion('${this._id}')">${body}</dl>
			<script name="STWAccordion" onload="fnSTWAccordion('${this._id}')">
				function fnSTWAccordion(id) {
					const accordion = self.document.getElementById(id);
					accordion.querySelector("dl").addEventListener("click", event => {
						const dt = event.target.closest("dt");
						dt.querySelector("i").classList.toggle("fa-angle-down");
						dt.querySelector("i").classList.toggle("fa-angle-right");
						dt.nextElementSibling.style.display = dt.querySelector("i").classList.contains("fa-angle-down") ? 'block' : 'none';
					});
				}
			</script>`;
	}
}

STWFactory.Accordion = STWAccordion;