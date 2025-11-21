// Business logic for certificate management
const { Certificate } = require('../model/Certificates/Certificate');

exports.createCertificate = async (data) => Certificate.create(data);
exports.editCertificate = async (id, data) => Certificate.update(data, { where: { id } });
exports.deleteCertificate = async (id) => Certificate.destroy({ where: { id } });
exports.listCourseCertificates = async (courseId) => Certificate.findAll({ where: { courseId } });
