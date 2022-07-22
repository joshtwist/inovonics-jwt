import { ZuploContext, ZuploRequest, KeyValueStore } from "@zuplo/runtime";



export default async function (
	request: ZuploRequest,
	context: ZuploContext) {

	const cache = new KeyValueStore(context);
	const token = request.headers.get('token');

	const cachedValue = await cache.get(token)

	if (cachedValue) {
		context.log.info('found in cache')
		const data = JSON.parse(cachedValue);
		request.user = {
			sub: token,
			data
		}
		return request;
	}

	context.log.info('requesting token from auth service')
	const authResult = await fetch(`https://jsonplaceholder.typicode.com/todos/${token}`);

	if (!authResult.ok) {
		return new Response(`Unauthorized`, { status: 401 });
	}

	const data = await authResult.json();

	cache.put(token, JSON.stringify(data), { expirationSecondsTtl: 60 });

	request.user = {
		sub: token,
		data
	}

	return request;
}

