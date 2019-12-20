import Mail from '../../lib/Mail';

class EnrollmentInscriptionMail {
  // get -> Enrollment.key > variável de fácil acesso
  get key() {
    return 'EnrollmentInscriptionMail';
  }

  async handle({ data }) {
    const { name, email, title, formatedPrice, formatedEndDate } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Novo plano na academia GymPoint',
      template: 'enrollmentInscription',
      context: {
        student: name,
        subscription: title,
        price: formatedPrice,
        end_date: formatedEndDate,
      },
    });
  }
}
export default new EnrollmentInscriptionMail();
