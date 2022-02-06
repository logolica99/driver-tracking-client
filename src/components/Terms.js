import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Terms() {
  return (
    <div>
      <h3>To Be Read and Accepted Applicant: </h3>
      <p>
        It is agreed and understood that any misrepresentation given on this
        application shall be considered an act of dishonesty. It is agreed and
        understood that the motor carrier or his agents may investigate the
        applicant's background to obtain any and all information of concern to
        applicant's record, whether same is of record or not, and applicant
        releases employers and person named herein from all liability for any
        damages on account of his furnishing such information. It is also agreed
        and understood that under the Fair Credit Reporting Act, Public Law
        91-508, I have been told that this investigation may include an
        investigating Consumer Report, including information regarding my
        character, general reputation, personal characteristics, and mode of
        living. I agree to furnish such additional information and complete such
        examinations as may be required to complete my application file. It is
        agreed and understood that this Application in no way obligates the
        motor carrier to employ or hire the applicant. It is agreed and
        understood that if qualified and hired, I may be on a probationary
        period during which time I may be disqualified without recourse. This
        certifies that this application was completed by me, and that all
        entries on it and information in it are true and complete to the best of
        my knowledge
      </p>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="I agree to the terms and conditions"
        />
      </FormGroup>
    </div>
  );
}
