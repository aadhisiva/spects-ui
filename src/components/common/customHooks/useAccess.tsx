import React from 'react'
import userSelectedValue from './userSelectedValue'

export default function useAccess() {
  const [{ Access }] = userSelectedValue()
  let superAcces = Access.District == 'Yes' && Access.Type == 'Admin' && 'District'
  let districtAcces = Access.District == 'Yes' ? 'District' : ''
  let talukAcces = Access.Taluk == 'Yes' ? 'Taluk' : ''
  let phcoAcces = Access.Phco == 'Yes' ? 'Phco' : ''
  let subCenterAcces = Access.SubCenter == 'Yes' ? 'SubCenter' : ''

  let loginAuthAccess =
    Access.District == 'Yes' && Access.Type == 'Admin'
      ? 'Admin'
      : Access.District == 'Yes'
        ? 'District'
        : Access.Taluk == 'Yes'
          ? 'Taluk'
          : Access.Phco == 'Yes'
            ? 'Phco'
            : Access.SubCenter == 'Yes'
              ? 'Subcenter'
              : ''

  let mobileAuthAccess =
    Access.District == 'Yes' && Access.Type == 'Admin'
      ? true
      : Access.District == 'Yes'
        ? true
        : Access.Taluk == 'Yes'
          ? true
          : Access.Phco == 'Yes'
            ? true
            : Access.SubCenter == 'Yes'
              ? true
              : false

  let dropDownAuthAccess =
    Access.District == 'Yes'
      ? 'District'
      : Access.Taluk == 'Yes'
        ? 'District'
        : Access.Phco == 'Yes'
          ? 'Taluk'
          : Access.SubCenter == 'Yes'
            ? 'Phco'
            : ''

  const authValues = {
    DistrictLevel: superAcces ? "" : districtAcces ? "" : talukAcces ? "District" : phcoAcces ? "District" : subCenterAcces ? "District" : "",
    TalukLevel : superAcces ? "" : districtAcces ? "" : talukAcces ? "District" : phcoAcces ? "Taluk" : subCenterAcces ? "Taluk": "",
    PhcoLevel : superAcces ? "" : districtAcces ? "" : talukAcces ? "" : phcoAcces ? "" : subCenterAcces ? "Phco" : ""
  };
  
  return [
    {
      superAcces,
      districtAcces,
      subCenterAcces,
      talukAcces,
      phcoAcces,
      loginAuthAccess,
      mobileAuthAccess,
      dropDownAuthAccess,
      authValues
    },
  ]
}
