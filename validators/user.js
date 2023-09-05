const joi = require('joi')
// 通用验证中间件函数
const commonValidateFn = (rules) => ((req, res, next) => {
    const userinfo = req.body
    const validateRes = rules.validate(userinfo, { abortEarly: false, allowUnknown: true })
    if (validateRes.error) throw validateRes.error
    else next()
})
const usernameRule = joi.string().required().pattern(/^\S{1,20}$/)//通用用户名验证规则
const passwordRule = joi.string().required().pattern(/^\S{6,20}$/)//通用密码验证规则
// 注册（登录）规则
const regAndLoginRules = joi.object({
    username: usernameRule,
    password: passwordRule
})
exports.registerAndLoginValidator = commonValidateFn(regAndLoginRules)