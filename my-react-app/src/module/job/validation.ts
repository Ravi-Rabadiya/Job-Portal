import * as Yup from 'yup';

export const ApplicationModalSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  pan_number: Yup.string()
  .matches(/[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/, 'Please Enter a Valid PAN Number')
  .required('PAN Number is Required'),
  mobile_number: Yup.string().required('Mobile number is required'),
  education: Yup.string().required('Education details are required'),
  ctc: Yup.string().required('Current CTC is required'),
  expected_ctc: Yup.string().required('Expected CTC is required'),
  notice_period: Yup.string().required('Notice period is required'),
  total_work_experience: Yup.string().required('Total work experience is required'),
  gender: Yup.string().required('Please select your gender').oneOf(['male', 'female'], 'Gender is required'),
  state: Yup.string().required('State is required'),
});
