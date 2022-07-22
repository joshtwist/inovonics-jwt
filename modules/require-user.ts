import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

type MyPolicyOptionsType = {
	myOption: any,
}
export default async function (
	request: ZuploRequest, 
	context: ZuploContext, 
	options: MyPolicyOptionsType,
	policyName: string) {
	
	if (!request.user) {
		return new Response(`Unauthorized`, { status: 401});
	}

    return request;
}