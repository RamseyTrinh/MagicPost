import { useEffect, useState } from "react";
import SelectAddress from "../SelectAddress/SelectAddress.jsx";
import { apiGetPublicProvinces } from "../../Services/app.jsx";
import { apiGetPublicDistrict } from "../../Services/app.jsx";
import { apiGetPublicWard } from "../../Services/app.jsx";
import Stack from "@mui/material/Stack";

export default function SelectAdd() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWard(district);
      if (response.status === 200) {
        setWards(response.data?.results);
      }
    };
    district && fetchPublicWard();
    !district && setDistricts([]);
  }, [province, district]);

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
      <SelectAddress
        label="Tỉnh thành phố"
        options={provinces}
        setValue={setProvince}
        type="province"
        value={province}
      />
      <SelectAddress
        label="Quận/huyện"
        options={districts}
        setValue={setDistrict}
        type="district"
        value={district}
      />
      <SelectAddress
        label="Phường/xã"
        options={wards}
        setValue={setWard}
        type="ward"
        value={ward}
      />
    </Stack>
  );
}
