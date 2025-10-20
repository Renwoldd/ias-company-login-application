import { useState } from 'react';

function ModuleTree({ modules, onSubmoduleClick, selectedSubmodule, primaryColor }) {
  const [expandedSystems, setExpandedSystems] = useState({});
  const [expandedModules, setExpandedModules] = useState({});

  const toggleSystem = (systemId) => {
    setExpandedSystems((prev) => ({
      ...prev,
      [systemId]: !prev[systemId],
    }));
  };

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <div className="space-y-1">
      {modules.length === 0 ? (
        <p className="text-gray-400 text-center py-4 text-sm">
          No modules found
        </p>
      ) : (
        modules.map((system) => (
          <div key={system.system_id}>
            {/* System Level */}
            <button
              onClick={() => toggleSystem(system.system_id)}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center justify-between text-sm font-semibold text-gray-700"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span>{system.system_name}</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${expandedSystems[system.system_id] ? 'rotate-90' : ''
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Modules Level */}
            {expandedSystems[system.system_id] && (
              <div className="ml-4 space-y-1 mt-1">
                {system.modules.map((module) => (
                  <div key={module.module_id}>
                    <button
                      onClick={() => toggleModule(module.module_id)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center justify-between text-sm text-gray-600"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span>{module.module_name}</span>
                      </div>
                      {/* <svg
                        className={`w-4 h-4 transition-transform ${
                          expandedModules[module.module_id] ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg> */}
                      <svg
                        className={`w-4 h-4 transition-transform ${expandedModules[module.module_id] ? 'rotate-90' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={primaryColor || '#233C67'} // use theme color
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Submodules Level */}
                    {expandedModules[module.module_id] && (
                      <div className="ml-4 space-y-1 mt-1">
                        {module.submodules.map((submodule) => (
                          <button
                            key={submodule.id}
                            onClick={() => onSubmoduleClick(submodule)}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition ${selectedSubmodule?.id === submodule.id
                              ? 'text-white font-medium'
                              : 'text-gray-600'
                              }`}
                            style={
                              selectedSubmodule?.id === submodule.id
                                ? { backgroundColor: primaryColor || '#233C67' }
                                : { cursor: 'pointer' }
                            }
                          >
                            {submodule.name}
                          </button>

                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ModuleTree;
