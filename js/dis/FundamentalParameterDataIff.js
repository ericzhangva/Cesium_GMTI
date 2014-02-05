/**
 * 5.2.45. Fundamental IFF atc data
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.FundamentalParameterDataIff = function()
{
   /** ERP */
   this.erp = 0;

   /** frequency */
   this.frequency = 0;

   /** pgrf */
   this.pgrf = 0;

   /** Pulse width */
   this.pulseWidth = 0;

   /** Burst length */
   this.burstLength = 0;

   /** Applicable modes enumeration */
   this.applicableModes = 0;

   /** padding */
   this.pad2 = 0;

   /** padding */
   this.pad3 = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.erp = inputStream.readFloat32();
       this.frequency = inputStream.readFloat32();
       this.pgrf = inputStream.readFloat32();
       this.pulseWidth = inputStream.readFloat32();
       this.burstLength = inputStream.readInt();
       this.applicableModes = inputStream.readUByte();
       this.pad2 = inputStream.readUShort();
       this.pad3 = inputStream.readUByte();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeFloat32(this.erp);
       outputStream.writeFloat32(this.frequency);
       outputStream.writeFloat32(this.pgrf);
       outputStream.writeFloat32(this.pulseWidth);
       outputStream.writeUInt(this.burstLength);
       outputStream.writeUByte(this.applicableModes);
       outputStream.writeUShort(this.pad2);
       outputStream.writeUByte(this.pad3);
};
}; // end of class
