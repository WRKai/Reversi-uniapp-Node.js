const joi = require('joi')
// 通用验证中间件函数
const commonValidateFn = (rules) => ((req, res, next) => {
    const userinfo = req.body
    const validateRes = rules.validate(userinfo, { abortEarly: false, allowUnknown: true })
    if (validateRes.error) throw validateRes.error
    else next()
})
const room_numberRule = joi.string().required().pattern(/^\d{4}$/)
const room_numberRules = joi.object({
    room_number: room_numberRule
})
exports.searchValidator = commonValidateFn(room_numberRules)
const initNumberRule = joi.number().required().min(1).max(10)
const initRules = joi.object({
    room_number: room_numberRule,
    initNumber: initNumberRule
})
exports.initValidator = commonValidateFn(initRules)