/**
 * Record sets, used in transfer control request PDU
 *
 * Copyright (c) 2008-2013, MOVES Institute, Naval Postgraduate School. All rights reserved.
 * This work is licensed under the BSD open source license, available at https://www.movesinstitute.org/licenses/bsd.html
 *
 * @author DMcG
 */
if (typeof dis === "undefined")
 dis = {};

 dis.RecordSet = function()
{
   /** record ID */
   this.recordID = 0;

   /** record set serial number */
   this.recordSetSerialNumber = 0;

   /** record length */
   this.recordLength = 0;

   /** record count */
   this.recordCount = 0;

   /** ^^^This is wrong--variable sized data records */
   this.recordValues = 0;

   /** ^^^This is wrong--variable sized padding */
   this.pad4 = 0;

  this.initFromBinaryDIS = function(inputStream)
  {

       this.recordID = inputStream.readInt();
       this.recordSetSerialNumber = inputStream.readInt();
       this.recordLength = inputStream.readUShort();
       this.recordCount = inputStream.readUShort();
       this.recordValues = inputStream.readUShort();
       this.pad4 = inputStream.readUByte();
  }

  this.encodeToBinaryDIS = function(outputStream)
  {

       outputStream.writeUInt(this.recordID);
       outputStream.writeUInt(this.recordSetSerialNumber);
       outputStream.writeUShort(this.recordLength);
       outputStream.writeUShort(this.recordCount);
       outputStream.writeUShort(this.recordValues);
       outputStream.writeUByte(this.pad4);
};
}; // end of class
