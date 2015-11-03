var exports = {};

exports.dbWriteError = function(ctx, e) {
  console.log('[ERROR] failed to write to DB', e);
  ctx.status = 500;
  ctx.body = { message: 'opps, looks like something went wrongm, try again latter.' };
}

module.exports = exports;