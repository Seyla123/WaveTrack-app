import React from "react";
import TeacherForm from '../../../components/teacher/TeacherForm';
import FormComponent from "../../../components/common/FormComponent";

function TeacherCreatePage() {
  return (
      <>
        {/* Header */}
        <FormComponent title={"Teacher Create"} subTitle={"Please Fill Teacher Information"}>
        {/* Tabs */}
        <TeacherForm />
      </FormComponent>
      </>
  );
}

export default TeacherCreatePage;
