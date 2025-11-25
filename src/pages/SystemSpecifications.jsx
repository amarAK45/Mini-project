import React from 'react';
import { Info } from 'lucide-react';

const SystemSpecifications = ({
    storageType, setStorageType,
    storageCapacity, setStorageCapacity,
    filtrationSystem, setFiltrationSystem,
    pumpType, setPumpType,
    pumpCapacity, setPumpCapacity,
    distributionPressure, setDistributionPressure,
    additionalFeatures, setAdditionalFeatures
}) => {
    return (
        <div className="form-grid">
            <div className="form-group">
                <label>Storage Type <span className="required">*</span></label>
                <div className="select-wrapper">
                    <select
                        value={storageType}
                        onChange={(e) => setStorageType(e.target.value)}
                    >
                        <option value="" disabled>Select storage type</option>
                        <option value="Underground Tank">Underground Tank - Concrete/plastic underground storage</option>
                        <option value="Overhead Tank">Overhead Tank - Elevated storage system</option>
                        <option value="Modular System">Modular System - Flexible modular storage units</option>
                        <option value="Recharge Pond">Recharge Pond - Open pond for groundwater recharge</option>
                        <option value="Recharge Well">Recharge Well - Direct aquifer recharge system</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Storage Capacity (Liters) <span className="required">*</span></label>
                <input
                    type="number"
                    placeholder="Enter storage capacity"
                    value={storageCapacity}
                    onChange={(e) => setStorageCapacity(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Filtration System <span className="required">*</span></label>
                <div className="select-wrapper">
                    <select
                        value={filtrationSystem}
                        onChange={(e) => setFiltrationSystem(e.target.value)}
                    >
                        <option value="" disabled>Select filtration system</option>
                        <option value="Basic Filtration">Basic Filtration - Mesh and sediment filters</option>
                        <option value="Advanced Filtration">Advanced Filtration - Multi-stage filtration system</option>
                        <option value="UV Treatment">UV Treatment - UV disinfection system</option>
                        <option value="RO System">RO System - Reverse osmosis purification</option>
                        <option value="No Filtration">No Filtration - Direct storage without treatment</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Pump Type</label>
                <div className="select-wrapper">
                    <select
                        value={pumpType}
                        onChange={(e) => setPumpType(e.target.value)}
                    >
                        <option value="" disabled>Select pump type</option>
                        <option value="Submersible Pump">Submersible Pump</option>
                        <option value="Centrifugal Pump">Centrifugal Pump</option>
                        <option value="Solar Pump">Solar Pump</option>
                        <option value="Manual/Gravity Fed">Manual/Gravity Fed</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Pump Capacity (LPH)</label>
                <input
                    type="number"
                    placeholder="Liters per hour"
                    value={pumpCapacity}
                    onChange={(e) => setPumpCapacity(e.target.value)}
                />
                <span className="help-text">Liters per hour</span>
            </div>

            <div className="form-group">
                <label>Distribution Pressure (PSI)</label>
                <input
                    type="number"
                    placeholder="Enter system pressure"
                    value={distributionPressure}
                    onChange={(e) => setDistributionPressure(e.target.value)}
                />
                <span className="help-text">Pounds per square inch</span>
            </div>

            <div className="form-group full-width">
                <label>Additional System Features</label>
                <div className="checkbox-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={additionalFeatures.firstFlushDiverter}
                            onChange={(e) => setAdditionalFeatures({
                                ...additionalFeatures,
                                firstFlushDiverter: e.target.checked
                            })}
                        />
                        <span>First Flush Diverter - Diverts initial contaminated water</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={additionalFeatures.waterQualityMonitoring}
                            onChange={(e) => setAdditionalFeatures({
                                ...additionalFeatures,
                                waterQualityMonitoring: e.target.checked
                            })}
                        />
                        <span>Water Quality Monitoring - Sensors for water quality tracking</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={additionalFeatures.backupWaterSupply}
                            onChange={(e) => setAdditionalFeatures({
                                ...additionalFeatures,
                                backupWaterSupply: e.target.checked
                            })}
                        />
                        <span>Backup Water Supply - Alternative water source integration</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={additionalFeatures.overflowManagement}
                            onChange={(e) => setAdditionalFeatures({
                                ...additionalFeatures,
                                overflowManagement: e.target.checked
                            })}
                        />
                        <span>Overflow Management - Handles excess water during heavy rainfall</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={additionalFeatures.automatedControls}
                            onChange={(e) => setAdditionalFeatures({
                                ...additionalFeatures,
                                automatedControls: e.target.checked
                            })}
                        />
                        <span>Automated Controls - Smart system controls and monitoring</span>
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={additionalFeatures.distributionNetwork}
                            onChange={(e) => setAdditionalFeatures({
                                ...additionalFeatures,
                                distributionNetwork: e.target.checked
                            })}
                        />
                        <span>Distribution Network - Piping for water distribution</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SystemSpecifications;
