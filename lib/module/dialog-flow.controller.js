"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constant_1 = require("../constant");
let DialogController = DialogController_1 = class DialogController {
    constructor(handlers) {
        this.handlers = handlers;
    }
    static forRoute(webHookConfig) {
        Reflect.defineMetadata(constant_1.PATH_METADATA, webHookConfig.basePath, DialogController_1);
        Reflect.defineMetadata(constant_1.PATH_METADATA, webHookConfig.postPath, Object.getOwnPropertyDescriptor(DialogController_1.prototype, 'dialogFlowWebHook').value);
        Reflect.defineMetadata(constant_1.METHOD_METADATA, common_1.RequestMethod.POST, Object.getOwnPropertyDescriptor(DialogController_1.prototype, 'dialogFlowWebHook').value);
        return DialogController_1;
    }
    dialogFlowWebHook(dialogFlowResponse, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const intent = dialogFlowResponse.queryResult.intent.displayName;
            const action = dialogFlowResponse.queryResult.action;
            const handler = this.handlers.get(intent) || this.handlers.get(action);
            if (!handler) {
                throw new Error(`Unknown handler for ${intent ? `intent ${intent}.` : (action ? `action ${action}.` : 'an undefined intent and/or action.')}`);
            }
            const fulfillment = yield handler.call(this, dialogFlowResponse);
            return res.status(common_1.HttpStatus.OK).send(fulfillment);
        });
    }
};
__decorate([
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DialogController.prototype, "dialogFlowWebHook", null);
DialogController = DialogController_1 = __decorate([
    common_1.Controller(),
    __param(0, common_1.Inject('Handlers')),
    __metadata("design:paramtypes", [Map])
], DialogController);
exports.DialogController = DialogController;
var DialogController_1;