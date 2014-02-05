/**
 * Used in UaPdu
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.AcousticBeamFundamentalParameter = function()
{
   /** parameter index */
   this.activeEmissionParameterIndex = 0;

   /** scan pattern */
   this.scanPattern = 0;

   /** beam center azimuth */
   this.beamCenterAzimuth = 0;

   /** azimuthal beamwidth */
   this.azimuthalBeamwidth = 0;

   /** beam center */
   this.beamCenterDE = 0;

   /** DE beamwidth (vertical beamwidth) */
   this.deBeamwidth = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.activeEmissionParameterIndex = inputStream.readUShort();
       this.scanPattern = inputStream.readUShort();
       this.beamCenterAzimuth = inputStream.readFloat32();
       this.azimuthalBeamwidth = inputStream.readFloat32();
       this.beamCenterDE = inputStream.readFloat32();
       this.deBeamwidth = inputStream.readFloat32();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUShort(this.activeEmissionParameterIndex);
       outputStream.writeUShort(this.scanPattern);
       outputStream.writeFloat32(this.beamCenterAzimuth);
       outputStream.writeFloat32(this.azimuthalBeamwidth);
       outputStream.writeFloat32(this.beamCenterDE);
       outputStream.writeFloat32(this.deBeamwidth);
};
}; // end of class
