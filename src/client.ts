import {GrpcWebFetchTransport} from "@protobuf-ts/grpcweb-transport";
import {AuthServiceClient} from "./proto/auth.client.ts";
import {TodoServiceClient} from "./proto/todo.client.ts";

const transport = () => {
    return new GrpcWebFetchTransport({
        baseUrl: "https://[::1]:50051",
    })
}

export class Auth extends AuthServiceClient {
    constructor() {
        super(transport());
    }
}

export class Todos extends TodoServiceClient {
    constructor() {
        super(transport());
    }
}