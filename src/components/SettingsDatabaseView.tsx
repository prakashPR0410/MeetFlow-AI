import React, { useState } from 'react';
import { Database, Table, Key, ShieldCheck, CheckCircle2, Server } from 'lucide-react';
import { DATABASE_TABLES } from '../data/initialData';

export const SettingsDatabaseView: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState(DATABASE_TABLES[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2C221E] tracking-tight flex items-center gap-2">
            <Database className="w-6 h-6 text-[#D49B53]" /> SQLite3 Database & System Settings
          </h2>
          <p className="text-xs text-[#6E615A]">
            Relational database inspector matching Chapter 6 (Database Design & 3NF Normalization) of the report.
          </p>
        </div>
        <div className="clay-pill px-3 py-1 rounded-full text-xs font-bold text-[#3B7A57] border border-[#E6DCCB] flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3B7A57]" /> 3NF Normalization Verified
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Tables Navigator */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider px-1">
            SQLite3 Database Tables
          </div>

          <div className="space-y-2">
            {DATABASE_TABLES.map((tbl) => {
              const isSelected = tbl.tableName === selectedTable.tableName;
              return (
                <button
                  key={tbl.tableName}
                  onClick={() => setSelectedTable(tbl)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all ${
                    isSelected
                      ? 'bg-[#2C221E] text-white shadow-md'
                      : 'clay-card hover:bg-[#F3ECE0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs flex items-center gap-2">
                      <Table className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D49B53]' : 'text-[#8C7A6B]'}`} />
                      {tbl.tableName}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-[#3D2E28] text-[#D49B53]' : 'bg-[#EFE4D2] text-[#8C7A6B]'
                    }`}>
                      {tbl.columns.length} Cols
                    </span>
                  </div>
                  <p className={`text-[10px] mt-1 ${isSelected ? 'text-[#D9CFC0]' : 'text-[#6E615A]'}`}>
                    {tbl.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Table Schema & Sample Rows */}
        <div className="lg:col-span-8 space-y-6">
          <div className="clay-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-3">
              <div>
                <h3 className="font-bold text-base text-[#2C221E] flex items-center gap-2">
                  Table Schema: <span className="text-[#D49B53]">{selectedTable.tableName}</span>
                </h3>
                <p className="text-xs text-[#6E615A] font-medium">{selectedTable.description}</p>
              </div>
            </div>

            {/* Column Schema Table */}
            <div className="overflow-x-auto rounded-xl border border-[#E8DFC8]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F5EFE4] text-[#2C221E] font-bold border-b border-[#E8DFC8]">
                    <th className="p-3">Field Name</th>
                    <th className="p-3">Data Type</th>
                    <th className="p-3">Key Constraint</th>
                    <th className="p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFC8] bg-[#FFFDF9]">
                  {selectedTable.columns.map((col) => (
                    <tr key={col.name} className="hover:bg-[#FAF4EA]">
                      <td className="p-3 font-mono font-bold text-[#2C221E]">{col.name}</td>
                      <td className="p-3 font-mono text-[#D49B53]">{col.type}</td>
                      <td className="p-3">
                        {col.isPK && (
                          <span className="bg-[#EFE4D2] text-[#B88037] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                            <Key className="w-2.5 h-2.5" /> PRIMARY KEY
                          </span>
                        )}
                        {col.isFK && (
                          <span className="bg-[#E2EFE7] text-[#3B7A57] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                            FOREIGN KEY
                          </span>
                        )}
                        {!col.isPK && !col.isFK && <span className="text-[#8C7A6B] text-[10px]">—</span>}
                      </td>
                      <td className="p-3 text-[#6E615A]">{col.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sample Table Rows */}
            {selectedTable.rows && selectedTable.rows.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-[#2C221E] uppercase tracking-wider">
                  Sample Relational Records:
                </h4>
                <div className="overflow-x-auto rounded-xl border border-[#E8DFC8] bg-[#F5EFE4] p-3 font-mono text-[11px] text-[#2C221E]">
                  {selectedTable.rows.map((row, idx) => (
                    <div key={idx} className="p-2 bg-[#FFFDF9] rounded-lg border border-[#E8DFC8] mb-2 last:mb-0">
                      {JSON.stringify(row, null, 2)}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
