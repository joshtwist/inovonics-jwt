import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

type MyPolicyOptionsType = {
	myOption: any,
}
export default async function (
	request: ZuploRequest, 
	context: ZuploContext, 
	options: MyPolicyOptionsType,
	policyName: string) {
	
	const token = request.headers.get('token');

	const authResult = await fetch(`https://jsonplaceholder.typicode.com/todos/${token}`);

	if (!authResult.ok) {
		return new Response(`Unauthorized`, { status: 401 });
	}


    return request;
}