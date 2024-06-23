const path = require('path');
const CWD = process.cwd();
exports.CWD = CWD
exports.FRONT_PATH = path.join(CWD, "../meetProject")

exports.BACK_PATH = path.join(CWD, "../meetprojectback")
exports.NEXT_EDIT_PATH = path.join(CWD, "../nextEdit")