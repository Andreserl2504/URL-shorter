import z from 'zod';
var urlSchema = z.string().url();
export default (function (url) {
    return urlSchema.safeParse(url);
});
