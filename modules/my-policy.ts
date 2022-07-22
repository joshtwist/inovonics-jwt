import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

type MyPolicyOptionsType = {
	myOption: any,
}
export default async function (
	request: ZuploRequest,
	context: ZuploContext,
	options: MyPolicyOptionsType,
	policyName: string) {

	const result = await fetch('https://jsonplaceholder.typicode.com/todos');


	context.log.info(result.status, result.statusText);

	const body = await result.text();

	context.log.info(body);

	return request;
}