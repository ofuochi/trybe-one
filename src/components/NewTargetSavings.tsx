import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import api from "../config/api.config";
import { localStoreService } from "../services";
import { Title } from "./Common/Title";

export const NewTargetSavings = () => {
  const [targetSaving, setTargetSaving] = useState<
    API.GetTargetSavingsResponseDto[]
  >();

  const currentUser = localStoreService.getCurrentUser();
  useEffect(() => {
    api
      .get<API.GetTargetSavingsResponseListDto>(
        `/User/GetTargetSavingsByProfileId?profileID=${currentUser?.userId}`
      )
      .then(({ data }) => setTargetSaving(data.targetSavings));
  }, [currentUser?.userId]);

  let data = targetSaving?.map((t) => ({
    name: t.item || "",
    value: t.amt || 0,
  }));
  if (data?.length === 0)
    data = [
      { name: "Car", value: 50 },
      { name: "Food", value: 39 },
      { name: "Groceries", value: 78 },
      { name: "Movies", value: 100 },
      { name: "Rent", value: 150 },
    ];

  return (
    <>
      <Title title="Target Savings" />
      <div className="col-lg-8 col-md-8 bd-right pl-5 pr-3 mt-4">
        <div className="page-content">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <h4>New Target Savings </h4>
            </div>
            <div className="col-lg-12">

            <div className="custom-radio row justify-content-between m-0">
<input type="radio" id="cat" name="animal" value="" checked />
<label className="px-3 py-3 btn btn-light shadow-sm col-lg-5" htmlFor="cat">    
 <i className="i-ic">
                  <img
                    className="ml-2 w-30 mr-3"
                    alt=""
                    src="/assets/images/ic-target.svg"
                  />
                </i>
                Target Box</label>

<input type="radio" id="dog" name="animal" value="" />
<label className="px-3 py-3 btn btn-light shadow-sm col-lg-5" htmlFor="dog" >     <i className="i-ic">
                  <img
                    className="ml-2 w-30 mr-3"
                    alt=""
                    src="/assets/images/ic-targetb.svg"
                  />
                </i>
                Eye on the Goal</label>
</div>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mdc-top-app-bar__title mb-0 mb-4 p-0">
              Target box savings
            </h5>

            <div className="form-group mb-0">
              <form>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Name of Target you want to save for"
                    className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                  />
                  <label>Name of Target you want to save for</label>
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="How long do you want to save for? (days)"
                    className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                  />
                  <label>How long do you want to save for? (days)</label>
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="How often should you be debited"
                    className="form-control d-block w-100 bdbtm-0 bd-radius-0"
                  />
                  <label>How often should you be debited</label>
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="What time of the day should we debit you"
                    className="form-control d-block w-100 bd-radius-0"
                  />
                  <label>What time of the day should we debit you</label>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-4 row">
            <div className="col-lg-7"></div>
            <div className="col-lg-5 text-right">
              <Button variant="danger" className="px-4" type="submit">
                <img
                  alt="showimg"
                  className="mr-3"
                  src="/assets/images/ic-send.svg"
                />
                Create Target
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="row mb-0 d-flex mt-3 justify-content-between">
          <div className="col s6">
            <div className="text-left">
              <button className="btn no-bg p-0">
                <img alt="" src="/assets/images/ic-search.svg" />
              </button>
            </div>
          </div>
          <div className="col s6">
            <div className="text-right">
              <button className="btn no-bg p-0">
                <img alt="" src="/assets/images/ic-notification.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
