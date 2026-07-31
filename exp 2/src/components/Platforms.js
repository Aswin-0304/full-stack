import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlatform } from "../features/platforms/platformSlice";

function Platforms() {
  const dispatch = useDispatch();

  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  const [platformName, setPlatformName] = useState("");

  const handleAddPlatform = () => {
    if (!platformName.trim()) {
      alert("Enter a platform name.");
      return;
    }

    dispatch(addPlatform(platformName));

    setPlatformName("");
  };

  return (
    <div className="card">
      <div className="card-heading">
        <div>
          <p className="eyebrow">PLATFORMS</p>
          <h2>Manage Platforms</h2>
        </div>
      </div>

      <div className="platform-list">
        {platforms.map((platform) => (
          <span className="platform-chip" key={platform}>
            {platform}
          </span>
        ))}
      </div>

      <div className="add-platform">
        <input
          type="text"
          placeholder="Enter another platform, e.g. Pinterest"
          value={platformName}
          onChange={(event) =>
            setPlatformName(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAddPlatform();
            }
          }}
        />

        <button onClick={handleAddPlatform}>
          + Add Platform
        </button>
      </div>
    </div>
  );
}

export default Platforms;