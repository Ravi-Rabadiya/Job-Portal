/* eslint-disable @typescript-eslint/no-explicit-any */
import FormControl from "../../components/FormControl";
import FormLabel from "../../components/FormLabel";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import useStore from "../../shared/store/useStore";
import { ApplicationModalSchema } from "./validation";
import FormError from "../../components/FormError";
import clsx from "clsx";

const ApplicationModal = ({ setApplyNowModal, applyJobData }: any) => {
  const [file, setFile] = useState<any>(null);
  const { jobTitle } = useStore();
  const handleCloseModal = () => {
    setApplyNowModal(false);
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addJobApplication = async (data: any) => {
    const response = await axios.post(`http://localhost:3000/apply`, data);
    return response.data;
  };
  const { mutate: applyJobMutate, isLoading: applyJobIsLoading } = useMutation({
    mutationFn: (data) => addJobApplication(data),
    onSuccess: () => {
      setApplyNowModal(false);
      toast.success("Application added successfully");
    },
  });

  const { handleSubmit, setFieldValue, errors, values, handleChange } = useFormik({
    initialValues: {
      job_id: "",
      category_id: "",
      first_name: "",
      last_name: "",
      email: "",
      pan_number: "",
      mobile_number: "",
      education: "",
      ctc: "",
      expected_ctc: "",
      notice_period: "",
      total_work_experience: "",
      gender: "",
      state: "",
      resume_file: "",
    },
    onSubmit: (values: any) => {
      const formData: any = new FormData();
      Object.keys(values).forEach((key) => {
        if (!["resume_file", "job_id", "category_id"].includes(key)) {
          formData.append(key, values[key]);
        }
      });
      formData.append("resume_file", file);
      formData.append("job_id", applyJobData.job_id);
      formData.append("category_id", applyJobData.category_id);
      if (!file.name) {
        toast.error("Please upload consent form");
        return;
      }

      applyJobMutate(formData);
    },
    validationSchema:ApplicationModalSchema,
  });

  const handleOnChangeEvent = (event: any) => {
    setFieldValue(event?.target.name, Number(event.target.value));
  };

  const onStateChange = (event: any) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };

  const handleFileChange = async (e: any) => {
    e.preventDefault();

    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }

    // check file size
    if (fileObj.size > 25000000) {
      toast.error("Please select file under 25MB");
      setFile(null);
      e.target.value = null;
      return;
    }

    //check file types
    if (fileObj.type !== "application/pdf") {
      toast.error(
        "Invalid file format. Supported Format: .JPEG, .JPG, .PDF, .PNG"
      );
      setFile(null);
      e.target.value = null;
      return;
    }

    setFile(fileObj);
    e.target.value = null;
  };

  if (applyJobIsLoading) {
    return <h1>Loading</h1>;
  }

  const statesDataList = [
    { value: "SelectState", label: "Select State" },
    { value: "Andra Pradesh", label: "Andra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madya Pradesh", label: "Madya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Orissa", label: "Orissa" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttaranchal", label: "Uttaranchal" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "West Bengal", label: "West Bengal" },
    {
      value: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Dadar and Nagar Haveli", label: "Dadar and Nagar Haveli" },
    { value: "Daman and Diu", label: "Daman and Diu" },
    { value: "Delhi", label: "Delhi" },
    { value: "Lakshadeep", label: "Lakshadeep" },
    { value: "Pondicherry", label: "Pondicherry" },
  ];

  return (
    <>
      <div
        className="modal fade modal-toggle  show"
        id="exampleModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {jobTitle}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <FormLabel name="First Name" htmlFor="htmlFor" />
                    <FormControl
                      onChange={handleChange}
                      value={values.first_name}
                      id="first_name"
                      type="text"
                      name="first_name"
                      className={errors.first_name ? "is-error" : ""}
                    />
                    <FormError error={errors.first_name} />
                  </div>
                  <div className="form-group col-md-4">
                    <FormLabel name="Last Name" htmlFor="lastname" />
                    <FormControl
                      onChange={handleChange}
                      value={values.last_name}
                      id="last_name"
                      type="text"
                      name="last_name"
                      className={errors.last_name ? "is-error" : ""}
                    />
                    <FormError error={errors.last_name} />
                  </div>

                  <div className="form-group col-md-4">
                    <FormLabel name="Email" htmlFor="youremail" />
                    <FormControl
                      onChange={handleChange}
                      value={values.email}
                      id="email"
                      type="text"
                      name="email"
                      className={errors.email ? "is-error" : ""}
                    />
                    <FormError error={errors.email} />
                  </div>

                  <div className="form-group col-md-4">
                    <FormLabel name="Pancard number" htmlFor="pan_number" />
                    <FormControl
                      onChange={(event: any) => handleOnChangeEvent(event)}
                      value={values.pan_number}
                      id="pan_number"
                      type="text"
                      name="pan_number"
                      className={errors.pan_number ? "is-error" : ""}
                    />
                    <FormError error={errors.pan_number} />
                  </div>
                  <div className="form-group col-md-4">
                    <FormLabel name="Mobile number" htmlFor="mobilenumber" />
                    <FormControl
                      onChange={(event: any) => handleOnChangeEvent(event)}
                      value={values.mobile_number}
                      id="mobile_number"
                      type="number"
                      name="mobile_number"
                      className={errors.mobile_number ? "is-error" : ""}
                    />
                    <FormError error={errors.mobile_number} />
                  </div>

                  <div className="form-group col-md-4">
                    <FormLabel name="Education" htmlFor="education" />
                    <FormControl
                      onChange={handleChange}
                      value={values.education}
                      id="education"
                      type="text"
                      name="education"
                      className={errors.education ? "is-error" : ""}
                    />
                    <FormError error={errors.education} />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="ctc">CTC (In Laksh)</label>
                    <FormLabel name="" htmlFor="ctc" />
                    <FormControl
                      onChange={(event: any) => handleOnChangeEvent(event)}
                      value={values.ctc}
                      id="ctc"
                      type="number"
                      name="ctc"
                      className={errors.ctc ? "is-error" : ""}
                    />
                    <FormError error={errors.ctc} />
                  </div>

                  <div className="form-group col-md-4">
                    <FormLabel name="Expected CTC" htmlFor="expctc" />
                    <FormControl
                      onChange={(event: any) => handleOnChangeEvent(event)}
                      value={values.expected_ctc}
                      id="expctc"
                      type="number"
                      name="expected_ctc"
                      className={errors.expected_ctc ? "is-error" : ""}
                    />
                    <FormError error={errors.expected_ctc} />
                  </div>

                  <div className="form-group col-md-4">
                    <FormLabel name="Notice Period" htmlFor="notice_period" />
                    <FormControl
                      onChange={(event: any) => handleOnChangeEvent(event)}
                      value={values.notice_period}
                      id="notice_period"
                      type="text"
                      name="notice_period"
                      className={errors.notice_period ? "is-error" : ""}
                    />
                    <FormError error={errors.notice_period} />
                  </div>

                  <div className="form-group col-md-4">
                    <FormLabel
                      name="Total Work Experience"
                      htmlFor="workexperience"
                    />
                    <FormControl
                      onChange={(event: any) => handleOnChangeEvent(event)}
                      value={values.total_work_experience}
                      id="workexperience"
                      type="text"
                      name="total_work_experience"
                      className={errors.total_work_experience ? "is-error" : ""}
                    />
                    <FormError error={errors.total_work_experience} />
                  </div>

                  <div className="form-group col-md-4">
                    <FormLabel name="Gender" htmlFor="gendar" />
                    <FormControl
                      onChange={handleChange}
                      value={values.gender}
                      id="gendar"
                      type="text"
                      name="gender"
                      className={errors.gender ? "is-error" : ""}
                    />
                    <FormError error={errors.gender} />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">State</label>
                    <select
                      className={clsx(errors.state ? "is-error" : "", "form-control")}
                      id="inputState"
                      value={values.state}
                      name="state"
                      onChange={onStateChange}
                    >
                      {statesDataList.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    <FormError error={errors.state} />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="resume">Add Resume</label>
                    <input
                      className="form-control"
                      type="file"
                      id="resume"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ApplicationModal;
